
import { Observable } from 'rxjs';

export const enum PathUpdateType {
  CREATE = 'create',
  MOVE = 'move',
  MODIFY = 'modify',
  DELETE = 'delete',
}

export type SegmentedPath = ArrayLike<string>;

export function encodeSegmentedPath(path: SegmentedPath): string {
  return Array.prototype.map.call(path, encodeURIComponent).join('/');
}

export function decodeSegmentedPath(encoded: string): SegmentedPath {
  return encoded.split('/').map(decodeURIComponent);
}

export interface PathDeletion<TPath = SegmentedPath> {
  type: PathUpdateType.DELETE;
  path: TPath;
}

export interface PathCreation<TPath = SegmentedPath> {
  type: PathUpdateType.CREATE;
  path: TPath;
}

export interface PathTransfer<TPath = SegmentedPath> {
  type: PathUpdateType.MOVE;
  fromPath: TPath;
  toPath: TPath;
}

export interface PathModification<TPath = SegmentedPath, TModification = unknown> {
  type: PathUpdateType.MODIFY;
  path: TPath;
  modification: TModification;
}

export type PathUpdate<TPath = SegmentedPath, TModification = unknown> = (
  PathDeletion<TPath>
  | PathCreation<TPath>
  | PathTransfer<TPath>
  | PathModification<TPath, TModification>
);
