# CIDR Display - VSCode Extension

![image](https://github.com/user-attachments/assets/7b6abef5-b5c8-4999-986a-d2e43b96e197)

A Visual Studio Code extension that provides detailed information about CIDR notation when hovering over IP addresses with subnet masks. It also displays the number of available IP addresses inline.

## Features

- Displays detailed IP range information on hover:
  - Host address
  - Total number of addresses in the network
  - Network range (first to last address)
  - Usable range (excluding network and broadcast addresses)
- Shows the number of available addresses inline after each CIDR notation
- Supports all file types

## Installation

You can install this extension through the Visual Studio Code Marketplace:

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install daylight55.vscode-cidr-display`

Or install it from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=daylight55.vscode-cidr-display) website.

## Usage

1. Open any file containing CIDR notation
2. Hover over a CIDR notation (e.g., "192.168.0.0/24")
3. View the detailed information in the hover tooltip
4. See the number of available addresses displayed inline after the CIDR notation

## Examples

- Private network ranges:
  - 10.0.0.0/8 (Large network)
  - 172.16.0.0/12 (Medium network)
  - 192.168.0.0/24 (Small network)
- Subnet examples:
  - 192.168.1.0/28 (16 addresses)
  - 10.0.0.0/16 (65,536 addresses)

## Requirements

- Visual Studio Code version 1.86.0 or higher

## Extension Settings

This extension does not add any VS Code settings.

## Known Issues

See the [GitHub issues](https://github.com/daylight55/vscode-cidr-display/issues) page.

## Contributing

Contributions are welcome! Please check our [Contributing Guidelines](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Development

1. Clone the repository
2. Run `npm install`
3. Open in VS Code
4. Press F5 to start debugging

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Release Notes

See [Releases](https://github.com/daylight55/vscode-cidr-display/releases) for detailed release notes.
