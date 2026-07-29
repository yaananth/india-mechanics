import { sources } from '../server/seed-data/catalog.ts'
import { budgetSources } from '../server/seed-data/budgets.ts'
import { crimeSafetySources } from '../server/seed-data/crime-safety.ts'
import { andhraSources } from '../server/seed-data/andhra-pradesh.ts'
import { developmentSources } from '../server/seed-data/development-trade.ts'
import { securitySources } from '../server/seed-data/security.ts'
import { semiconductorSources } from '../server/seed-data/semiconductors.ts'
import { tamilNaduSources } from '../server/seed-data/tamil-nadu.ts'

const allSources = [
  ...sources,
  ...developmentSources,
  ...securitySources,
  ...semiconductorSources,
  ...andhraSources,
  ...tamilNaduSources,
  ...crimeSafetySources,
  ...budgetSources,
]

type Result = {
  id: string
  url: string
  status: number | 'error'
  classification: 'reachable' | 'blocked' | 'missing' | 'error'
  detail?: string
}

async function checkSource(
  source: (typeof allSources)[number],
): Promise<Result> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25_000)
  try {
    let response = await fetch(source.url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'India-Mechanics-Source-Check/0.1' },
    })
    if (
      response.status === 405 ||
      response.status === 501 ||
      (response.status >= 400 &&
        ![401, 403, 429].includes(response.status))
    ) {
      response = await fetch(source.url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'user-agent': 'India-Mechanics-Source-Check/0.1',
          range: 'bytes=0-1024',
        },
      })
    }
    if (response.status === 416) {
      response = await fetch(source.url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'user-agent': 'India-Mechanics-Source-Check/0.1',
        },
      })
    }
    const classification =
      response.status >= 200 && response.status < 400
        ? 'reachable'
        : response.status === 401 ||
            response.status === 403 ||
            response.status === 429 ||
            response.status >= 500
          ? 'blocked'
          : 'missing'
    return {
      id: source.id,
      url: source.url,
      status: response.status,
      classification,
    }
  } catch (error) {
    const errorName =
      error && typeof error === 'object' && 'name' in error
        ? String(error.name)
        : undefined
    const causeCode =
      error &&
      typeof error === 'object' &&
      'cause' in error &&
      error.cause &&
      typeof error.cause === 'object' &&
      'code' in error.cause
        ? String(error.cause.code)
        : undefined
    if (
      errorName === 'AbortError' ||
      causeCode === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' ||
      causeCode === 'CERT_HAS_EXPIRED' ||
      causeCode === 'SELF_SIGNED_CERT_IN_CHAIN' ||
      causeCode === 'ECONNRESET' ||
      causeCode === 'ETIMEDOUT' ||
      causeCode === 'UND_ERR_CONNECT_TIMEOUT' ||
      causeCode === 'ENOTFOUND' ||
      causeCode === 'EAI_AGAIN' ||
      causeCode === 'ECONNREFUSED'
    ) {
      return {
        id: source.id,
        url: source.url,
        status: 'error',
        classification: 'blocked',
        detail:
          errorName === 'AbortError'
            ? 'Request timed out'
            : `Transport verification blocked (${causeCode})`,
      }
    }
    return {
      id: source.id,
      url: source.url,
      status: 'error',
      classification: 'error',
      detail: error instanceof Error ? error.message : String(error),
    }
  } finally {
    clearTimeout(timeout)
  }
}

const concurrency = 4
const results: Result[] = []
for (let index = 0; index < allSources.length; index += concurrency) {
  results.push(
    ...(await Promise.all(
      allSources.slice(index, index + concurrency).map(checkSource),
    )),
  )
}

for (const result of results) {
  console.log(
    `${result.classification.padEnd(9)} ${String(result.status).padEnd(5)} ${result.id} ${result.detail ?? ''}`,
  )
}

const failures = results.filter(
  (result) => result.classification === 'missing' || result.classification === 'error',
)
const blocked = results.filter((result) => result.classification === 'blocked')
console.log(
  `\n${results.length} checked: ${results.length - failures.length - blocked.length} reachable, ${blocked.length} access-blocked, ${failures.length} failed.`,
)

process.exit(failures.length > 0 ? 1 : 0)
