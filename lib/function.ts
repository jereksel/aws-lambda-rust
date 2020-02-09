import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { build } from './build';

/**
 * Properties for a RustFunction
 */
export interface RustFunctionProps extends lambda.FunctionOptions {
  /**
   * Path to directory with Cargo.toml
   *
   * @default - Directory from where cdk binary is invoked
   */
  readonly directory?: string;

  /**
   * Executable name
   */
  readonly executable: string;

  /**
   * The build directory
   *
   * @default - `.build` in the entry file directory
   */
  readonly buildDir?: string;

  /**
   * The cache directory
   *
   * Parcel uses a filesystem cache for fast rebuilds.
   *
   * @default - `.cache` in the root directory
   */
  readonly cacheDir?: string;
}

/**
 * A Rust Lambda function built using cross
 */
export class RustFunction extends lambda.Function {
  constructor(scope: cdk.Construct, id: string, props: RustFunctionProps) {
    const entry = props.directory || process.cwd();
    const handler = "does.not.matter"
    const buildDir = props.buildDir || path.join(entry, '.build');
    const handlerDir = path.join(buildDir, crypto.createHash('sha256').update(entry).digest('hex'));
    createDirectory(buildDir);
    createDirectory(handlerDir);
    const runtime = lambda.Runtime.PROVIDED;

    // Build with Parcel
    build({
      entry,
      executable: props.executable,
      outDir: handlerDir
    });

    super(scope, id, {
      ...props,
      runtime,
      code: lambda.Code.fromAsset(handlerDir),
      handler: handler,
    });
  }
}

function createDirectory(dir: string) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}
