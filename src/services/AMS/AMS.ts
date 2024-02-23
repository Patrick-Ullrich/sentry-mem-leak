import { Requestly } from '../Requestly/Requestly';

export namespace AMS {
  export function fetchMetaUser() {
    return Requestly.get('https://httpbin.org/ip');
  }
}
