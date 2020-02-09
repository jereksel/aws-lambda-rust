import {spawnSync} from 'child_process';
import * as fs from 'fs';
import * as path from "path";

/**
 * Build options
 */
export interface BuildOptions {
  /**
   * Entry file
   */
  readonly entry: string;

  /**
   * The output directory
   */
  readonly outDir: string;

  /**
   * Executable name
   */
  readonly executable: string;

}

/**
 * Build with Parcel
 */
export function build(options: BuildOptions): void {

  try {

    const args = [
      "build",
      "--release",
      "--target", "x86_64-unknown-linux-musl",
      "--bin", options.executable
    ].filter(Boolean) as string[];

    const cross = spawnSync('cross', args, {cwd: options.entry});

    if (cross.error) {
      throw cross.error;
    }

    if (cross.status !== 0) {
      throw new Error(cross.stderr.toString().trim());
    }

    let from = path.join(options.entry, "target", "x86_64-unknown-linux-musl", "release", options.executable)
    let to = path.join(options.outDir, "bootstrap")

    fs.copyFileSync(from, to)

  } catch (err) {
    throw new Error(`Failed to build file at ${options.entry}: ${err}`);
  }
}
