# Snapshot Testing

Codesling heavily utilizes snapshot testing across the board to help with maintainability of unit and integration tests. Currently, there are no end-to-end tests.

If you've never heard of snapshot testing, check these 2 resources:

[Jest Snapshots and Beyond](https://www.youtube.com/watch?v=HAuXJVI_bUs)
[Snapshot Testing with Jest](https://facebook.github.io/jest/docs/en/snapshot-testing.html)

`__snapshots__` directories are intended to be committed to source control.

When modifying a test case or changing the behavior of a unit that affects a test case, you'll notice that the snapshot test (`yarn test`) will fail.

When it fails, you can choose to update the snapshot by passing in the `-u` flag to the testing command. You should only update a snapshot test if the intended behavior of the unit being tested or the test case itself is changing.

## Updating a Snapshot

In order to update a snapshot, you will need to pass the `-u` flag. However, because we are using npm scripts to run the individual jest commands, we will need to pass along the flag from the npm script into jest:

```bash
$ yarn test -- -- -u # when running from the project root
$ yarn test -- -u # when running from individual server/service
```
