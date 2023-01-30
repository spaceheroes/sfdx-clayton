# sfdx-clayton

SFDX plugin to interact with Clayton platform

[![Version](https://img.shields.io/npm/v/sfdx-clayton.svg)](https://npmjs.org/package/sfdx-clayton)
[![Known Vulnerabilities](https://snyk.io/test/github/spaceheroes/sfdx-clayton/badge.svg)](https://snyk.io/test/github/spaceheroes/sfdx-clayton)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-clayton.svg)](https://npmjs.org/package/sfdx-clayton)
[![License](https://img.shields.io/npm/l/sfdx-clayton.svg)](https://github.com/spaceheroes/sfdx-clayton/blob/master/package.json)

<!-- install -->
<!-- usage -->

```sh-session
$ sfdx plugins:install @spaceheroes/sfdx-clayton
$ sfdx COMMAND
running command...
$ sfdx (--version)
@spaceheroes/sfdx-clayton/0.0.1 darwin-arm64 node-v16.14.2
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```

<!-- usagestop -->
<!-- commands -->

- [`sfdx clayton:scan:by_branch -b <string> -p <string> -w <string> [--wait <string>] [--client-id <string>] [--client-secret <string>] [--refresh-token <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-claytonscanby_branch--b-string--p-string--w-string---wait-string---client-id-string---client-secret-string---refresh-token-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx clayton:scan:by_pull_request -p <string> -n <integer> -w <string> [--wait <string>] [--client-id <string>] [--client-secret <string>] [--refresh-token <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-claytonscanby_pull_request--p-string--n-integer--w-string---wait-string---client-id-string---client-secret-string---refresh-token-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx clayton:scan:by_revision -p <string> -r <string> -w <string> [--wait <string>] [--client-id <string>] [--client-secret <string>] [--refresh-token <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-claytonscanby_revision--p-string--r-string--w-string---wait-string---client-id-string---client-secret-string---refresh-token-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx clayton:scan:get -w <string> -p <string> -s <string> [--client-id <string>] [--client-secret <string>] [--refresh-token <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-claytonscanget--w-string--p-string--s-string---client-id-string---client-secret-string---refresh-token-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx clayton:scan:by_branch -b <string> -p <string> -w <string> [--wait <string>] [--client-id <string>] [--client-secret <string>] [--refresh-token <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Run a scan of a branch

```
USAGE
  $ sfdx clayton:scan:by_branch -b <string> -p <string> -w <string> [--wait <string>] [--client-id <string>]
    [--client-secret <string>] [--refresh-token <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              (required) branch name
  -p, --project=<value>                                                             (required) unique identifier of the
                                                                                    environment or repository
  -w, --workspace=<value>                                                           (required) unique identifier of the
                                                                                    workspace
  --client-id=<value>                                                               Clayton client id for OAuth 2.0
                                                                                    authentication
  --client-secret=<value>                                                           Clayton client secret for OAuth 2.0
                                                                                    authentication
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --refresh-token=<value>                                                           Clayton refresh token for OAuth 2.0
                                                                                    authentication
  --wait=<value>                                                                    timeout in minutes for waiting the
                                                                                    scan to be processed ( minimium 5 )

DESCRIPTION
  Run a scan of a branch

EXAMPLES
  $ sfdx clayton:scan:by_branch --workspace 123 --project 123 --branch main
```

_See code: [src/commands/clayton/scan/by_branch.ts](https://github.com/spaceheroes/sfdx-clayton/blob/v0.0.1/src/commands/clayton/scan/by_branch.ts)_

## `sfdx clayton:scan:by_pull_request -p <string> -n <integer> -w <string> [--wait <string>] [--client-id <string>] [--client-secret <string>] [--refresh-token <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Run a scan of a pull_request

```
USAGE
  $ sfdx clayton:scan:by_pull_request -p <string> -n <integer> -w <string> [--wait <string>] [--client-id <string>]
    [--client-secret <string>] [--refresh-token <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -n, --pull-request-number=<value>                                                 (required) number identifier of the
                                                                                    pull request
  -p, --project=<value>                                                             (required) unique identifier of the
                                                                                    environment or repository
  -w, --workspace=<value>                                                           (required) unique identifier of the
                                                                                    workspace
  --client-id=<value>                                                               Clayton client id for OAuth 2.0
                                                                                    authentication
  --client-secret=<value>                                                           Clayton client secret for OAuth 2.0
                                                                                    authentication
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --refresh-token=<value>                                                           Clayton refresh token for OAuth 2.0
                                                                                    authentication
  --wait=<value>                                                                    timeout in minutes for waiting the
                                                                                    scan to be processed ( minimium 5 )

DESCRIPTION
  Run a scan of a pull_request

EXAMPLES
  $ sfdx clayton:scan:by_pull_request --workspace 123 --project 123 --pull_request_number 123
```

_See code: [src/commands/clayton/scan/by_pull_request.ts](https://github.com/spaceheroes/sfdx-clayton/blob/v0.0.1/src/commands/clayton/scan/by_pull_request.ts)_

## `sfdx clayton:scan:by_revision -p <string> -r <string> -w <string> [--wait <string>] [--client-id <string>] [--client-secret <string>] [--refresh-token <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Run a scan of a git revision

```
USAGE
  $ sfdx clayton:scan:by_revision -p <string> -r <string> -w <string> [--wait <string>] [--client-id <string>]
    [--client-secret <string>] [--refresh-token <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -p, --project=<value>                                                             (required) unique identifier of the
                                                                                    environment or repository
  -r, --revision=<value>                                                            (required) revision SHA
  -w, --workspace=<value>                                                           (required) unique identifier of the
                                                                                    workspace
  --client-id=<value>                                                               Clayton client id for OAuth 2.0
                                                                                    authentication
  --client-secret=<value>                                                           Clayton client secret for OAuth 2.0
                                                                                    authentication
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --refresh-token=<value>                                                           Clayton refresh token for OAuth 2.0
                                                                                    authentication
  --wait=<value>                                                                    timeout in minutes for waiting the
                                                                                    scan to be processed ( minimium 5 )

DESCRIPTION
  Run a scan of a git revision

EXAMPLES
  $ sfdx clayton:scan:by_revision --workspace 123 --project 123 --revision 123
```

_See code: [src/commands/clayton/scan/by_revision.ts](https://github.com/spaceheroes/sfdx-clayton/blob/v0.0.1/src/commands/clayton/scan/by_revision.ts)_

## `sfdx clayton:scan:get -w <string> -p <string> -s <string> [--client-id <string>] [--client-secret <string>] [--refresh-token <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Fetch a scan report

```
USAGE
  $ sfdx clayton:scan:get -w <string> -p <string> -s <string> [--client-id <string>] [--client-secret <string>]
    [--refresh-token <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -p, --project=<value>                                                             (required) unique identifier of the
                                                                                    environment or repository
  -s, --scan=<value>                                                                (required) unique identifier of the
                                                                                    scan
  -w, --workspace=<value>                                                           (required) unique identifier of the
                                                                                    workspace
  --client-id=<value>                                                               Clayton client id for OAuth 2.0
                                                                                    authentication
  --client-secret=<value>                                                           Clayton client secret for OAuth 2.0
                                                                                    authentication
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --refresh-token=<value>                                                           Clayton refresh token for OAuth 2.0
                                                                                    authentication

DESCRIPTION
  Fetch a scan report

EXAMPLES
  $ sfdx clayton:scan --workspace 123 --project 123 --scan 123
```

_See code: [src/commands/clayton/scan/get.ts](https://github.com/spaceheroes/sfdx-clayton/blob/v0.0.1/src/commands/clayton/scan/get.ts)_

<!-- commandsstop -->
