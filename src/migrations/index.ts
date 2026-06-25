import * as migration_20260625_125657_cms_refactor from './20260625_125657_cms_refactor';

export const migrations = [
  {
    up: migration_20260625_125657_cms_refactor.up,
    down: migration_20260625_125657_cms_refactor.down,
    name: '20260625_125657_cms_refactor'
  },
];
