OctoStats
==============================

Github API scrapper to get insight on your organization's repositories activity.

### Usage

Just run `npm start ORG-NAME REPO-TYPE` (the type is optional, it can be public or private);

Example result:
```javascript
npm start rootstrap

[ { repo: 'rails_api_base',
    totalContributions: 128,
    lastWeekCommitCount: 7,
    lastWeekViewCount: { count: 844, uniques: 100 },
    lastWeekCloneCount: { count: 49, uniques: 18 },
    lastWeekOpenIssueCount: 0,
    lastWeekClosedIssueCount: 4 },
  { repo: 'treant-js',
    totalContributions: 57,
    lastWeekCommitCount: 4,
    lastWeekViewCount: { count: 17, uniques: 2 },
    lastWeekCloneCount: { count: 7, uniques: 6 },
    lastWeekOpenIssueCount: 0,
    lastWeekClosedIssueCount: 1 },
  { repo: 'react-native-base',
    totalContributions: 52,
    lastWeekCommitCount: 4,
    lastWeekViewCount: { count: 724, uniques: 35 },
    lastWeekCloneCount: { count: 76, uniques: 8 },
    lastWeekOpenIssueCount: 3,
    lastWeekClosedIssueCount: 4 },
  { repo: 'react-redux-base',
    totalContributions: 157,
    lastWeekCommitCount: 6,
    lastWeekViewCount: { count: 427, uniques: 39 },
    lastWeekCloneCount: { count: 46, uniques: 8 },
    lastWeekOpenIssueCount: 0,
    lastWeekClosedIssueCount: 20 },
  ...]
  ```
