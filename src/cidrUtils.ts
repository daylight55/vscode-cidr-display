export interface ICIDRInfo {
  hostAddress: string;
  totalIPs: number;
  startIP: string;
  endIP: string;
  firstUsableIP: string;
  lastUsableIP: string;
}

function isValidIP(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 0 && num <= 255;
  });
}

export function calculateCIDRInfo(cidr: string): ICIDRInfo | null {
  try {
    const [ip, mask] = cidr.split("/");
    if (!ip || !mask || !isValidIP(ip)) {
      return null;
    }

    const maskBits = parseInt(mask, 10);
    if (isNaN(maskBits) || maskBits < 0 || maskBits > 32) {
      return null;
    }

    // IPアドレスを数値に変換
    const ipParts = ip.split(".").map((part) => parseInt(part, 10));
    const ipNum =
      (ipParts[0] << 24) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3];

    // ネットワークアドレスとブロードキャストアドレスを計算
    const totalIPs = Math.pow(2, 32 - maskBits);
    const netmask = -1 << (32 - maskBits);
    const networkAddr = ipNum & netmask;
    const broadcastAddr = networkAddr + totalIPs - 1;

    // 数値をIPアドレス文字列に変換する関数
    const numToIP = (num: number): string => {
      return [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255,
      ].join(".");
    };

    // /32の場合は特別な処理
    if (maskBits === 32) {
      return {
        hostAddress: ip,
        totalIPs: 1,
        startIP: ip,
        endIP: ip,
        firstUsableIP: ip,
        lastUsableIP: ip,
      };
    }

    // 使用可能なIPアドレス範囲（ネットワークアドレスとブロードキャストアドレスを除く）
    const firstUsable = networkAddr + 1;
    const lastUsable = broadcastAddr - 1;

    return {
      hostAddress: ip,
      totalIPs: totalIPs,
      startIP: numToIP(networkAddr),
      endIP: numToIP(broadcastAddr),
      firstUsableIP: numToIP(firstUsable),
      lastUsableIP: numToIP(lastUsable),
    };
  } catch {
    return null;
  }
}
