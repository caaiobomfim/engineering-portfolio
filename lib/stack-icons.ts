/**
 * Maps stack names (case-insensitive) to their simple-icons slug.
 * Slugs are used to look up icons at runtime from the `simple-icons` package.
 *
 * To add a new tech: find the slug at https://simpleicons.org, then add an
 * entry here. No imports needed — the lookup is dynamic.
 */
export const STACK_SLUGS: Record<string, string> = {
  // Languages
  go:               'go',
  python:           'python',
  rust:             'rust',
  typescript:       'typescript',
  javascript:       'javascript',

  // Runtimes & frameworks
  'node.js':        'nodedotjs',
  nodejs:           'nodedotjs',
  react:            'react',
  'next.js':        'nextdotjs',
  nextjs:           'nextdotjs',
  'spring boot':    'spring',
  spring:           'spring',

  // Databases
  postgresql:       'postgresql',
  postgres:         'postgresql',
  mysql:            'mysql',
  mongodb:          'mongodb',
  redis:            'redis',
  elasticsearch:    'elasticsearch',

  // Infrastructure & cloud
  docker:           'docker',
  kubernetes:       'kubernetes',
  terraform:        'terraform',
  nginx:            'nginx',
  gcp:              'googlecloud',

  // Messaging
  rabbitmq:         'rabbitmq',
  kafka:            'apachekafka',

  // Observability
  grafana:          'grafana',
  prometheus:       'prometheus',

  // CI/CD
  'github actions': 'githubactions',
  graphql:          'graphql',
}

export function getStackSlug(name: string): string | null {
  return STACK_SLUGS[name.toLowerCase()] ?? null
}
