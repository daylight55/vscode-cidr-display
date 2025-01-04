# Contributing to CIDR Display

Thank you for your interest in contributing to the CIDR Display VSCode Extension!　　
This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-org-or-user-name/vscode-cidr-display.git
   cd vscode-cidr-display
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### Environment Setup

1. Ensure you have the following installed:

   - Node.js (LTS version recommended)
   - Visual Studio Code
   - Git

2. Install project dependencies:
   ```bash
   npm install
   ```

### Development Workflow

1. Make your changes in your feature branch
2. Run the test suite:
   ```bash
   npm test
   ```
3. Ensure code coverage meets requirements:
   ```bash
   npm run test:coverage
   ```
4. Run the linter:
   ```bash
   npm run lint
   ```
5. Fix any linting issues:
   ```bash
   npm run lint:fix
   ```

## Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Follow the existing code style
- Add appropriate type annotations
- Avoid using `any` type
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Testing Requirements

- Write tests for all new features and bug fixes
- Maintain minimum 80% code coverage
- Test both success and error cases
- Use meaningful test descriptions
- Group related tests using `describe` blocks

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the CHANGELOG.md following the existing format
3. Ensure all tests pass and coverage requirements are met
4. Ensure your code follows the established coding standards
5. Create a Pull Request with a clear title and description
6. Link any relevant issues in the Pull Request description

### Pull Request Guidelines

- Keep PRs focused on a single feature or bug fix
- Include tests for new functionality
- Update documentation as needed
- Ensure CI checks pass
- Respond to review comments promptly

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. Clear and descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. VS Code version
6. Extension version
7. Operating system
8. Screenshots if applicable

### Feature Requests

When requesting features:

1. Explain the problem you're trying to solve
2. Describe the desired solution
3. Discuss alternative solutions considered
4. Provide context and use cases

## Development Commands

- `npm run compile` - Compile TypeScript
- `npm run watch` - Watch for changes and compile
- `npm run lint` - Lint the code
- `npm run lint:fix` - Fix linting issues
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create a new release on GitHub
4. Tag the release following semantic versioning
5. Publish to VS Code Marketplace

## Questions?

If you have questions about the contribution process, feel free to:

1. Open an issue with your question
2. Ask in the pull request
3. Contact the maintainers

Thank you for contributing to make this extension better!
