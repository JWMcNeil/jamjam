import type { Access } from 'payload'

/**
 * Access control for collections without drafts/versions.
 * Allows authenticated users full access, and unauthenticated users can read all documents.
 */
export const authenticatedOrPublic: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  // For collections without drafts, allow reading all documents
  return true
}

