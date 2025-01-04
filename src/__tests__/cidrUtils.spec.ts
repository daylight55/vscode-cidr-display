import { calculateCIDRInfo } from "../cidrUtils";

describe("calculateCIDRInfo", () => {
  it("should correctly calculate CIDR info for a /24 network", () => {
    const result = calculateCIDRInfo("192.168.1.0/24");
    expect(result).toEqual({
      hostAddress: "192.168.1.0",
      totalIPs: 256,
      startIP: "192.168.1.0",
      endIP: "192.168.1.255",
      firstUsableIP: "192.168.1.1",
      lastUsableIP: "192.168.1.254",
    });
  });

  it("should correctly calculate CIDR info for a /16 network", () => {
    const result = calculateCIDRInfo("172.16.0.0/16");
    expect(result).toEqual({
      hostAddress: "172.16.0.0",
      totalIPs: 65536,
      startIP: "172.16.0.0",
      endIP: "172.16.255.255",
      firstUsableIP: "172.16.0.1",
      lastUsableIP: "172.16.255.254",
    });
  });

  it("should handle single host (/32) correctly", () => {
    const result = calculateCIDRInfo("192.168.1.1/32");
    expect(result).toEqual({
      hostAddress: "192.168.1.1",
      totalIPs: 1,
      startIP: "192.168.1.1",
      endIP: "192.168.1.1",
      firstUsableIP: "192.168.1.1",
      lastUsableIP: "192.168.1.1",
    });
  });

  describe("error handling", () => {
    it("should return null for invalid CIDR notation", () => {
      expect(calculateCIDRInfo("invalid")).toBeNull();
    });

    it("should return null for invalid IP address", () => {
      expect(calculateCIDRInfo("256.256.256.256/24")).toBeNull();
    });

    it("should return null for invalid subnet mask", () => {
      expect(calculateCIDRInfo("192.168.1.0/33")).toBeNull();
      expect(calculateCIDRInfo("192.168.1.0/-1")).toBeNull();
    });
  });

  describe("edge cases", () => {
    it("should handle /0 network correctly", () => {
      const result = calculateCIDRInfo("0.0.0.0/0");
      expect(result).toEqual({
        hostAddress: "0.0.0.0",
        totalIPs: Math.pow(2, 32),
        startIP: "0.0.0.0",
        endIP: "255.255.255.255",
        firstUsableIP: "0.0.0.1",
        lastUsableIP: "255.255.255.254",
      });
    });

    it("should handle network boundaries correctly", () => {
      const result = calculateCIDRInfo("192.168.1.128/25");
      expect(result).toEqual({
        hostAddress: "192.168.1.128",
        totalIPs: 128,
        startIP: "192.168.1.128",
        endIP: "192.168.1.255",
        firstUsableIP: "192.168.1.129",
        lastUsableIP: "192.168.1.254",
      });
    });
  });
});
