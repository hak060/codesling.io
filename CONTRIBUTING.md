# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please read this entire contribution guide, developer documentation ([`docs/README.md`](docs/)) and the [documentation contribution guide](`docs/CONTRIBUTING.md) before contributing.

## Commit Guidelines

Please use multi-line messages for any commits that effectively do more than one thing to the codebase. A bigger commit with a multi-line commit message that outlines each change to the codebase is generally more conducive for accurate messaging. The exception to this is when a fix or feature pertains to a single line being changed in the codebase.

All commits must be prefixed using the following prefixes in brackets:

```
docs     | documentation related
ops      | operations related (dependency/lock-file updates, configuration changes, etc.)
feat     | adds a new feature
fix      | adds a fix for an issue
test     | adds a test
refactor | refactoring-related (DRY-up some parts of the code)
style    | code-style related (adding line breaks, removing whitespace, etc.)
visual   | front-end UI related changes
```

**Please do not mix up the nature of a single commit.** For example, if you notice that some line breaks need to be added and a bug needs to be fixed, make a separate `[style]` commit for the line breaks and a `[fix]` commit for addressing the bug.

Example multi-line commit message:

```
[docs] adds root and developer docs
- adds README.md to project root `/`
- adds README.md to project developer documentation `docs/`
```

Example single-line commit messages:

```
[docs] fixes typo in coderunner-service API doc
[ops] adds lodash dependency to coderunner-service
```

## Git Workflow

When pulling in the latest changes from the codebase, you will always need to do a `git pull --rebase` from the upstream repository, not a `git pull`.

The upstream org repository will have 3 branches:

```
dev
staging
master
```

Setup:

1. Fork the organization repo
1. Clone your remote fork
1. Add upstream: `git remote add upstream github.com/:org/:repo`

Pulling:

1. `git pull --rebase upstream dev` first to ensure you have latest changes from `upstream:dev`
1. make your changes and commit them
1. `git pull --rebase upstream dev` to fix any merge conflicts with new changes from `upstream:dev`

Pushing:

1. `git push origin BRANCH_NAME` to push to your own remote fork
1. Submit a pull request to `codesling:dev` from `YOUR_REMOTE_FORK:BRANCH_NAME`

### Branch Workflow Suggestion

We recommend making individual feature branches for each issue/feature. By doing so, you will prevent your pull request from being rejected for containing commits relating to more than one issue.

## When Submitting a Feature

When submitting a feature, be sure to denote any new exposed API endpoints / websocket realtime events by adding to the [developer documentation](docs/). Specifics on the documentation syntax are laid out in the [documentation contribution guide](docs/CONTRIBUTING.md).

## Pull Request Process

1. Ensure the commits follow the Commit Guidelines
1. Ensure that the PR contains a `[feat]` or `[fix]` commit message, addressing a single issue
1. Ensure all commits pertain to the same issue
1. Ensure new files follow the naming practices labeled in `docs/README.md`
1. Name your PRs concisely and succinctly
1. Update the README.md of the respective sub-application with details of changes to the interface. This may include new environment variables, exposed ports, useful file locations and container parameters
1. Once the Pull Request is signed-off by two other developers, it will be merged in by a project maintainer.
