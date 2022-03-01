# Development Guidelines
This document details some guidelines to follow when working on this project

## Issues
- All work should be captured in an Issue
- The issue should be titled to capture the main task in one short sentence
	- Additional details can be added as a description or comment
- The issue should be linked to the project and given an appropriate status i.e. Triage, Todo, In Progress

## Branches
- When working on an issue, make sure to branch off the latest version of the `main` branch. To do this:
```
git checkout main
git pull
git checkout -b your-branch-name-here
```
- Name your branches by prefixing TC, followed by the issue number, and a short name corresponding to the task e.g.
	- We have Issue #1: Add the required libraries for the project
	- An appropriate branch name would be `TC-1-add-required-libraries`

## Commits
- Commits should have an appropriate message describing what has been added/changed/removed in that commit
- Keep refactors separate from normal commits
	- i.e. if a change requires a refactor, there should be 2 commits
		- commit #1: Refactored data structure to allow X to happen
		- commit #2: Added functionality for X
- When committing incomplete or potentially broken code, prefix your commit message with WIP i.e.
	- WIP: Added a method to do X

## Pushing
- Never commit directly to main. It's not the end of the world if this happens but try to minimise direct commits on main
- You can use any method to push to your branch you wish e.g.
	- through terminal `git push -u origin HEAD`
	- through Visual Studio Code's Git tab
	- through a Git client like GitHub Desktop


## Pull Requests & Merging
### Creating a PR
- When creating a pull request, you can add `resolves #ISSUE_NUMBER_HERE` to the description so GitHub can automatically close the issue after the PR has been merged.
- If you have a reviewer on the PR, include any comments that may be helpful and steps to test your change in the PR

### Reviewing a PR
- This will cover reviewing PRs via the GitHub website. If you wish to use other method, like Visual Studio Code or GitHub Desktop, feel free to do so.
- When reviewing a change, make sure to:
	- Review the files changed via the Files Changed tab on GitHub
	- Carry out testing, if required
- Once you are happy with the code, you can approve the PR from the Files Changed tab on GitHub, clicking Review Changes, and choosing Approve 
### Rebasing
- When it comes time to merge your branch, rebase your branch with the latest main before doing so. 
	- Note: squashing your commits may make this easier, but is not enforced. the decision to/not to squash is entirely up to you
- Ensure you have the latest version of the main branch
```
git checkout main
git pull
```
- Checkout your branch and rebase
```
git checkout your-branch-name-here
git rebase main
```
- Resolve any conflicts, and **force push**
```
git push origin your-branch-name-here --force
```

### Merging your PR
- Once reviewers are happy, and you have rebased, you can merge using the green merge button on the PR
- Make sure to delete the branch after merging