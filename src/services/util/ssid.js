import { RandomString } from '.'

export function SsidGenerator() {
    return 'Tenda_' + RandomString(5).toUpperCase()
}

export function WifiGenerator() {
    return 'Tenda-' + RandomString(5).toUpperCase()
}