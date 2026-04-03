/**
 * Maps normalized stack names to local image assets in /public/icons/stacks/.
 *
 * Use this for logos not available in simple-icons, or when you prefer a
 * custom asset over the simple-icons version.
 *
 * To add a new icon:
 *   1. Drop the file in public/icons/stacks/ (SVG preferred, PNG accepted)
 *   2. Add an entry here: 'stack name' -> '/icons/stacks/filename.svg'
 *   3. The badge will render it automatically — no other changes needed.
 */
export const STACK_ASSETS: Record<string, string> = {
  // Languages
  java:      '/icons/stacks/java.png',

  // Cloud / messaging
  'aws sqs':  '/icons/stacks/aws-sqs.png',
  dynamodb:   '/icons/stacks/dynamodb.png',
  localstack: '/icons/stacks/localstack.png',

  // Observability
  micrometer:    '/icons/stacks/micrometer.png',
  opentelemetry: '/icons/stacks/opentelemetry.png',

  // Testing
  testcontainers: '/icons/stacks/testcontainers.png',
  wiremock:       '/icons/stacks/wiremock.png',
}

export function getStackAsset(name: string): string | null {
  return STACK_ASSETS[name.toLowerCase()] ?? null
}
