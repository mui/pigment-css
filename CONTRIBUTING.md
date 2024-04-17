# Contributing to Pigment CSS

If you're reading this, you're awesome!
Thank you for being a part of the community and helping us make these projects great.
Here are a few guidelines that will help you along the way.

## Summary

- [Code of conduct](#code-of-conduct)
- [A large spectrum of contributions](#a-large-spectrum-of-contributions)
- [Your first pull request](#your-first-pull-request)
- [Sending a pull request](#sending-a-pull-request)
  - [Trying changes in the apps](#trying-changes-in-the-apps)
  - [How to increase the chances of being accepted](#how-to-increase-the-chances-of-being-accepted)
  - [CI checks and how to fix them](#ci-checks-and-how-to-fix-them)
  - [Coding style](#coding-style)
- [Contributing to the documentation](#contributing-to-the-documentation)
- [How can I use a change that hasn't been released yet?](#how-can-i-use-a-change-that-hasnt-been-released-yet)
- [Roadmap](#roadmap)
- [License](#license)

## Code of conduct

We have adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as our code of conduct, and we expect project participants to adhere to it.
Please read [the full text](https://github.com/mui/.github/blob/master/CODE_OF_CONDUCT.md) to understand what actions will and will not be tolerated.

## A large spectrum of contributions

There are many ways to contribute to the library, and writing code is only one part of the story—[documentation improvements](#contributing-to-the-documentation) can be just as important as code changes.
If you have an idea for an improvement to the code or the docs, we encourage you to open an issue as a first step, to discuss your proposed changes with the maintainers before proceeding.

## Your first pull request

Working on your first pull request? You can learn how in this free video series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

Get started with [good first issues](https://github.com/mui/pigment-css/issues?q=is:open+is:issue+label:"good+first+issue"), which have a limited scope and a working solution that's already been discussed.
This makes them ideal for newer developers, or those who are new to these libraries and want to see how the contribution process works.

We also have a list of [ready to take issues](https://github.com/mui/pigment-css/issues?q=is:open+is:issue+label:"ready+to+take"), which are issues that have already been at least partially resolved in discussion, to the point that it's clear what to do next.
These issues are great for developers who want to reduce their chances of falling down a rabbit hole in search of a solution.

Of course, you can work on any other issue you like—the "good first" and "ready to take" issues are simply those where the scope and timeline may be better defined.
Pull requests for other issues, or completely novel problems, may take a bit longer to review if they don't fit into our current development cycle.

If you decide to fix an issue, please make sure to check the comment thread in case somebody is already working on a fix.
If nobody is working on it at the moment, please leave a comment stating that you've started to work on it, so other people don't accidentally duplicate your effort.

If somebody claims an issue but doesn't follow up after more than a week, it's fine to take over, but you should still leave a comment.
If there has been no activity on the issue for 7 to 14 days, then it's safe to assume that nobody is working on it.

## Sending a pull request

Pigment CSS as a projects is community-driven, so pull requests are always welcome, but before working on a large change, it's best to open an issue first to discuss it with the maintainers.

When in doubt, keep your pull requests small.
For the best chances of being accepted, don't bundle more than one feature or bug fix per PR.
It's often best to create two smaller PRs rather than one big one.

1. Fork the repository.

2. Clone the fork to your local machine and add the upstream remote:

```bash
git clone https://github.com/<your username>/pigment-css.git
cd pigment-css
git remote add upstream https://github.com/mui/pigment-css.git
```

<!-- #default-branch-switch -->

3. Synchronize your local `master` branch with the upstream one:

```bash
git checkout master
git pull upstream master
```

4. Install the dependencies with pnpm (yarn or npm aren't supported):

```bash
pnpm install
```

5. Create a new topic branch:

```bash
git checkout -b my-topic-branch
```

6. Make changes, commit, and push to your fork:

```bash
git push -u origin HEAD
```

7. Go to [the repository](https://github.com/mui/pigment-css) and open a pull request.

The core team actively monitors for new pull requests.
We will review your PR and either merge it, request changes to it, or close it with an explanation.

### Trying changes in the apps

While the documentation is still under development, we have few apps in the repository where you can test the changes. Before running the apps, make sure that the packages are build by running

```bash
pnpm build
```

After this, you can run one of the applications located in the `/apps` directory, by following their `README.md` files.

### How to increase the chances of being accepted

Continuous Integration (CI) automatically runs a series of checks when a PR is opened.
If you're unsure whether your changes will pass, you can always open a PR, and the GitHub UI will display a summary of the results.
If any of these checks fail, refer to [Checks and how to fix them](#checks-and-how-to-fix-them).

Make sure the following is true:

<!-- #default-branch-switch -->

- The branch is targeted at `master` for ongoing development. All tests are passing. Code that lands in `master` must be compatible with the latest release. It may contain additional features but no breaking changes. We should be able to release a new minor version from the tip of `master` at any time.
- If a feature is being added:
  - If the result was already achievable with the core library, you've explained why this feature needs to be added to the core.
  - If this is a common use case, you've added an example to the documentation.
- If adding new features or modifying existing ones, you've included tests to confirm the new behavior.
- If props were added or prop types were changed, you've updated the TypeScript declarations.
- The branch is not [behind its target branch](https://github.community/t/branch-10-commits-behind/2403).

We will only merge a PR when all tests pass.
The following statements must be true:

- The code is formatted. If the code was changed, run `pnpm prettier`.
- The code is linted. If the code was changed, run `pnpm eslint`.
- The code is type-safe. If TypeScript sources or declarations were changed, run `pnpm typescript` to confirm that the check passes.
- The pull request title follows the pattern `[product-name][Component] Imperative commit message`. (See: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) for a great explanation).

Don't worry if you miss a step—the Continuous Integration will run a thorough set of tests on your commits, and the maintainers of the project can assist you if you run into problems.

If your pull request addresses an open issue, make sure to link the PR to that issue.
Use any [supported GitHub keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) in the PR description to automatically link them.
This makes it easier to understand where the PR is coming from, and also speeds things up because the issue will be closed automatically when the PR is merged.

### CI checks and how to fix them

If any of the checks fail, click on the **Details** link and review the logs of the build to find out why it failed.
For CircleCI, you need to log in first.
No further permissions are required to view the build logs.
The following sections give an overview of what each check is responsible for.

#### ci/codesandbox

This task creates multiple sandboxes on CodeSandbox.com that use the version of npm packages that was built from this pull request.
It should not fail in isolation. Use it to test more complex scenarios.

#### ci/circleci: checkout

This is a preflight check to see if the dependencies and lockfile are ok.
Running `pnpm` and `pnpm deduplicate` should fix most issues.

#### ci/circleci: test_static

This checks code format and lints the repository.
The log of the failed build should explain how to fix any issues.
It also runs commands that generate or change some files (like `pnpm proptypes` for generating the prop types based on the TS definitions).
If the CI job fails, then you most likely need to run the commands that failed locally and commit the changes.

#### ci/circleci: test_unit-1

This runs the unit tests in a `jsdom` environment.
If it fails then `pnpm test:unit` should<sup>[1](test/README.md#accessibility-tree-exclusion)</sup> fail locally as well.
You can narrow the scope of tests run with `pnpm test:unit --grep ComponentName`.
If `pnpm test:unit` passes locally, but fails in CI, consider [Accessibility tree exclusion in CI](test/README.md#accessibility-tree-exclusion).

#### ci/circleci: test_types

This typechecks the repository.
The log of the failed build should list any issues.

#### codecov/project

This monitors coverage of the tests.
A reduction in coverage isn't necessarily bad, but it's always appreciated if it can be improved.

#### Misc

There are various other checks done by Netlify to validate the integrity of the docs.
Click on **Details** to find out more about them.

### Updating the component propTypes

The component's `propTypes` are auto-generated from the [JSDoc](https://jsdoc.app/about-getting-started.html) in the TypeScript declarations.
Be sure to update the documentation in the corresponding `.d.ts` files (for example `packages/pigment-css-react/Box.d.ts` for `<Box>`) and then run:

```bash
$ pnpm proptypes
```

### Coding style

Please follow the coding style of the project.
MUI Core projects use prettier and ESLint, so if possible, enable linting in your editor to get real-time feedback.

- `pnpm prettier` reformats the code.
- `pnpm eslint` runs the linting rules.

When you submit a PR, these checks are run again by our continuous integration tools, but hopefully your code is already clean!

## How can I use a change that hasn't been released yet?

We use [CodeSandbox CI](https://codesandbox.io/docs/ci) to publish a working version of the packages for each pull request as a "preview."

You can check the CodeSandbox CI status of a pull request to get the URL needed to install these preview packages:

```diff
diff --git a//package.json b//package.json
index 791a7da1f4..a5db13b414 100644
--- a/package.json
+++ b/package.json
@@ -61,7 +61,7 @@
   "dependencies": {
     "@babel/runtime": "^7.4.4",
-    "@pigment-css/react": "0.0.6",
+    "@pigment-css/react": "https://pkg.csb.dev/mui/pigment-css/commit/371c952b/@pigment-css/react",
```

## Roadmap

Learn more about the future by visiting our different projects' roadmaps:

- [Pigment CSS roadmap](https://github.com/orgs/mui/projects/27).

## License

By contributing your code to the [mui/pigment-css](https://github.com/mui/pigment-css) GitHub repository, you agree to license your contribution under the [MIT license](/LICENSE).
