## Amazon Lambda Rust Library
<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)
[![npm](https://img.shields.io/npm/v/aws-lambda-rust?style=for-the-badge)](https://www.npmjs.com/package/aws-lambda-rust)

> **This is unofficial CDK library based on Amazon Lambda Node.js Library**
---
<!--END STABILITY BANNER-->

This library provides constructs for Rust Lambda functions.

### Rust Function
Define a `RustFunction`:

```ts
new lambda.RustFunction(this, 'my-handler', {
    executable: "my_lambda"
});
```

By default, the construct will use directory where `cdn` was invoked as directory where Cargo files are located.

Alternatively, directory can be specified:
```ts
new lambda.RustFunction(this, 'MyFunction', {
  directory: '/path/to/directory/with/Cargo.toml'
  executable: "my_lambda"
});
```

All other properties of `lambda.Function` are supported, see also the [AWS Lambda construct library](https://github.com/aws/aws-cdk/tree/master/packages/%40aws-cdk/aws-lambda).

### Requirements

Library uses [cross](https://github.com/rust-embedded/cross) for building Rust code
