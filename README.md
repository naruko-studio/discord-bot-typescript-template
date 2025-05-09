# Discord.js template for typescript

> :warning: This project was created using `bun init` in bun v1.2.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.  
> ~~We recommended to use bun or yarn.~~  
> Since bun v1.2.10, we don't support node anymore.  
> you should use bun for dev.

## Breaking changes

- deprecated `node` for runtime.
- deprecated `tsx` and `dotenv` as dev dependencies.
- use logger v2(check commit [74c1829](https://github.com/naruko-studio/discord-bot-typescript-template/commit/74c182940736cd08211a38515c8338d61a70e736))
- add `build` script to build binaries for machines without bun installed(thanks [bun build --compile](https://bun.sh/docs/bundler/executables)).

## To install dependencies:

```bash
bun install
```

## To run with bun installed:

```bash
bun run start
```

## To build for machines not install bun:

```bash
bun run build:<target>
```

Thanks `bun build --compile`.  
We can build binaries.  
It let your bot running without bun installed.  
Here's target list:

| Target                  | Description                                       |
| ----------------------- | ------------------------------------------------- |
| linux-x64-modern        | for linux x64 with CPUs after 2013                |
| linux-x64-baseline      | for linux x64 with CPUs before 2013               |
| linux-arm64             | for linux on arm64                                |
| linux-x64-musl-modern   | for linux x64 with musl libc and CPUs after 2013  |
| linux-x64-musl-baseline | for linux x64 with musl libc and CPUs before 2013 |
| linux-arm64-musl        | for linux on arm64 with musl libc                 |
| darwin-x64-modern       | for macOS with Intel CPUs after 2013              |
| darwin-x64-baseline     | for macOS with Intel CPUs before 2013             |
| darwin-arm64            | for macOS with Apple Silicon                      |
| windows-x64-modern      | for Windows x64 with CPUs after 2013              |
| windows-x64-baseline    | for Windows x64 with CPUs before 2013             |

## Any problems?

any issue please report in [issue](https://github.com/naruko-studio/discord-bot-typescript-template/issues)
