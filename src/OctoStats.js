const moment = require('moment');
const Octokit = require('@octokit/rest');

class OctoStats {
  constructor() {
    this.client = new Octokit({
      auth: process.env.GITHUB_API_KEY,
    });
  }

  async statsForOrg({ org, type }) {
    const repos = await this.getRepos({ org, type });

    const repoStats = repos.map(({ name }) => this.repoStats({
      repo: name, owner: org,
    }));

    return Promise.all(repoStats);;
  }

  async getRepos({ org, type }) {
    const { data: repos } = await this.client.repos.listForOrg({
      org,
      type,
      sort: 'updated',
      direction: 'desc',
      per_page: 10,
    });

    return repos;
  }

  async repoStats({ repo, owner }) {
    const totalContributions = await this.commitCountForRepo({ repo, owner });
    const lastWeekCommitCount = await this.getWeeklyParticipationStats({ repo, owner });
    const lastWeekViewCount = await this.getWeeklyViewsForRepo({ repo, owner });
    const lastWeekCloneCount = await this.getWeeklyClonesForRepo({ repo, owner });
    const lastWeekOpenIssueCount = await this.getWeeklyIssueCountForRepo({ repo, owner, state: 'open' });
    const lastWeekClosedIssueCount = await this.getWeeklyIssueCountForRepo({ repo, owner, state: 'closed' });

    return {
      repo,
      totalContributions,
      lastWeekCommitCount,
      lastWeekViewCount,
      lastWeekCloneCount,
      lastWeekOpenIssueCount,
      lastWeekClosedIssueCount,
    };
  }

  async commitCountForRepo({ repo, owner }) {
    const { data } = await this.client.repos.getContributorsStats({
      owner,
      repo,
    });
    const total = data.reduce((accum, { total }) => total + accum, 0);

    return total;
  }

  async getWeeklyParticipationStats({ repo, owner }) {
    const { data: { all } } = await this.client.repos.getParticipationStats({
      owner, repo,
    });
    return all.length ? all[all.length - 1] : 0;
  }

  async getWeeklyViewsForRepo({ repo, owner }) {
    const { data: { count, uniques } } = await this.client.repos.getViews({
      owner, repo, per: 'week',
    });
    return { count, uniques };
  }

  async getWeeklyClonesForRepo({ repo, owner }) {
    const { data: { count, uniques } } = await this.client.repos.getClones({
      owner, repo, per: 'week',
    });
    return { count, uniques };
  }

  async getWeeklyIssueCountForRepo({ repo, owner, state }) {
    const { data } = await this.client.issues.listForRepo({
      owner,
      repo,
      since: moment().add(-7, 'days').toISOString(),
      state,
    });
    return data.length;
  }
}

module.exports = new OctoStats();
