# Bit.dev GitHub Actions Demo

This repository demonstrates how to use [bit.dev](https://bit.dev) GitHub Actions to automate Bit workflows for component development and management.

## Overview

This project showcases three essential GitHub Actions workflows that integrate Bit with your CI/CD pipeline:

- **Verify**: Validates workspace status and builds components
- **Pull Request**: Exports components to lanes and generates version labels
- **Merge**: Handles component versioning and exports to main

## Repository Structure

```
ci-scripts-demo/
├── .github/workflows/
│   ├── verify.yml          # Workspace verification on main branch
│   ├── pull-request.yml    # PR validation and lane management
│   └── merge.yml           # Component versioning and export
├── bit-components/         # Bit components directory
│   └── design/
│       ├── envs/
│       ├── patterns/
│       └── ui/
└──  workspace.jsonc         # Bit workspace configuration
```

## Workflows

### 1. Verify Workflow (`verify.yml`)

**Trigger**: Push to `main` branch

**Purpose**: Ensures the workspace is in a healthy state by running status checks and building all components.

**Actions**:
- Initializes Bit workspace
- Runs `bit status` to check for issues
- Builds all components to ensure they compile correctly

```yaml
name: Bit verify
on:
  push:
    branches: [main]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: bit-tasks/init@v3
      - uses: bit-tasks/verify@v2
```

### 2. Pull Request Workflow (`pull-request.yml`)

**Trigger**: Pull request opened or synchronized

**Purpose**: Validates changes, creates a Bit lane with component modifications, and generates version labels for semantic versioning.

**Actions**:
- Creates a Bit lane and adds component changes for verification
- Builds components to ensure they compile correctly
- Automatically generates GitHub labels for version bumps (major, minor, patch)
- Applies color-coded labels for easy identification
- Supports both component-specific and global version labels

**Version Label Types**:
- **Component-specific**: `component-name@major`, `component-name@minor`, `component-name@patch`
- **Global overrides**: `[major]`, `[minor]`, `[patch]`, `pre-release:<flag>`

**Label Colors**:
- 🔴 Major: `#f0a09f`
- 🟡 Minor: `#f0e8bd` 
- 🟢 Patch: `#c2e0c6`

```yaml
name: Bit PR Check
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  verify:
    steps:
      - uses: bit-tasks/pull-request@v3
        with:
          build: true
          version-labels: true
          version-labels-color-major: "f0a09f"
          version-labels-color-minor: "f0e8bd"
          version-labels-color-patch: "c2e0c6"
          clear-labels: true
```

### 3. Merge Workflow (`merge.yml`)

**Trigger**: Pull request merged to `main`

**Purpose**: Executes `bit ci merge` to tag and export components with intelligent version detection.

**Actions**:
- Analyzes the last merged pull request for version keywords
- Tags components with appropriate semantic versions
- Builds components before tagging (when enabled)
- Exports components to the remote scope on bit.cloud

**Version Detection Priority**:
1. **Pull Request Labels**: Version labels like `[major]`, `[minor]`, `[patch]`
2. **Pull Request Title**: Version keywords in square brackets (e.g., "Fix bug [patch]")
3. **Input Parameters**: Fallback to workflow configuration

**Supported Version Keywords**:
- `[major]` - Breaking changes
- `[minor]` - New features
- `[patch]` - Bug fixes (default)
- `[pre-release:<flag>]` - Pre-release versions (e.g., `[pre-release:beta]`)

```yaml
name: Bit Merge
on:
  pull_request:
    types: [closed]
    branches: [main]
jobs:
  main-merge:
    if: github.event.pull_request.merged == true
    steps:
      - uses: bit-tasks/tag-export@v3
        with:
          build: true
          increment: "patch"  # Fallback version
```

## Setup Instructions

### Prerequisites

1. **Bit Account**: Create an account at [bit.cloud](https://bit.cloud)
2. **Bit Workspace**: Initialize a Bit workspace in your repository
3. **GitHub Repository**: Host your code on GitHub
4. **Bit Version**: Ensure you're using Bit version ^1.11.42 or higher
   - `bit-tasks/verify@v2` requires Bit ^1.11.42
   - `bit-tasks/pull-request@v3` requires Bit ^1.11.42
   - `bit-tasks/tag-export@v3` requires Bit ^1.12.45

### Required Secrets

Add these secrets to your GitHub repository settings:

| Secret | Description | Required For |
|--------|-------------|-------------|
| `BIT_CONFIG_ACCESS_TOKEN` | Bit.dev access token for authentication | All workflows |
| `GITHUB_TOKEN` | GitHub token (automatically provided) | PR and Merge workflows |
| `GIT_USER_NAME` | Git username for commits | Merge workflow |
| `GIT_USER_EMAIL` | Git email for commits | Merge workflow |

### Required Permissions

Ensure your GitHub workflows have the necessary permissions:

```yaml
permissions:
  contents: write        # For merge workflow
  pull-requests: write   # For PR and merge workflows
```

### Getting Your Bit Access Token

1. Go to [bit.cloud](https://bit.cloud)
2. Navigate to your profile settings
3. Generate a new access token
4. Add it as `BIT_CONFIG_ACCESS_TOKEN` in your GitHub repository secrets

**Note**: The secret must be named `BIT_CONFIG_ACCESS_TOKEN` (not `BIT_ACCESS_TOKEN`) for the actions to work properly.

### Workspace Configuration

The `workspace.jsonc` file configures your Bit workspace:

```json
{
  "teambit.workspace/workspace": {
    "name": "ci-scripts-demo-2",
    "defaultDirectory": "bit-components/{scope}/{name}",
    "defaultScope": "automations.design"
  }
}
```

## Usage

### Development Workflow

1. **Create/Modify Components**: Work on your Bit components locally
2. **Create Pull Request**: Push changes and open a PR
   - The PR workflow will validate your changes
   - Version labels will be automatically generated
3. **Review and Merge**: After review, merge the PR
   - The merge workflow will apply versioning and export to bit.cloud

### Manual Version Control

You can control versioning in multiple ways:

**Component-Specific Labels** (applied to individual components):
- `ui/button@major` - Force major version bump for ui/button component
- `ui/button@minor` - Force minor version bump for ui/button component
- `ui/button@patch` - Force patch version bump for ui/button component

**Global Version Labels** (applied to all modified components):
- `[major]` - Breaking changes across all components
- `[minor]` - New features across all components
- `[patch]` - Bug fixes across all components
- `[pre-release:beta]` - Pre-release version with custom identifier

**PR Title Keywords** (alternative to labels):
- "Update component with breaking changes [major]"
- "Add new feature [minor]"
- "Fix critical bug [patch]"
- "Release candidate [pre-release:rc]"

### Component Structure

Components are organized under `bit-components/` following the pattern:
```
bit-components/{scope}/{component-name}/
```

## Advanced Configuration

### Additional Workflow Options

**Verify Workflow Options**:
- `ws-dir`: Specify workspace directory (default: current directory)
- `strict`: Fail on warnings as well as errors

**Pull Request Workflow Options**:
- `build`: Build components during verification
- `strict`: Enable strict mode for enhanced validation
- `clear-labels`: Automatically remove old Bit labels
- Custom label colors for better visual organization

**Merge Workflow Options**:
- `persist`: Add `--persist` flag for soft tagged components
- `build`: Build components before tagging
- `strict`: Enable strict mode for tagging
- `increment`: Fallback version increment (major, minor, patch)
- `prerelease-id`: Custom pre-release identifier (alpha, beta, rc)

### Best Practices

1. **Always enable building**: Set `build: true` in both PR and merge workflows
2. **Use descriptive PR titles**: Include version keywords in square brackets
3. **Consistent labeling**: Use the auto-generated labels or follow the naming convention
4. **Version strategy**: Plan your versioning strategy (semantic vs. custom)
5. **Test locally**: Run `bit status` and `bit build` before pushing changes

## Benefits

✅ **Automated Validation**: Every change is automatically tested

✅ **Semantic Versioning**: Automatic version management based on change impact

✅ **Lane Management**: Isolated development with Bit lanes

✅ **Visual Labels**: Color-coded PR labels for easy version identification

✅ **Continuous Integration**: Seamless integration with your existing CI/CD pipeline

✅ **Flexible Versioning**: Multiple ways to control component versions

✅ **Pre-release Support**: Built-in support for alpha, beta, and RC versions

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Ensure `BIT_ACCESS_TOKEN` is correctly set
2. **Build Failures**: Check component dependencies and imports
3. **Permission Errors**: Verify GitHub token permissions for the repository

### Debug Tips

- Check workflow logs in the GitHub Actions tab
- Verify Bit workspace configuration in `workspace.jsonc`
- Ensure all required secrets are properly configured

## Learn More

- [Bit Documentation](https://bit.dev/docs)
- [Bit GitHub Actions](https://github.com/bit-tasks)
- [Bit Workspace Configuration](https://bit.dev/reference/workspace/workspace-json)
- [Semantic Versioning](https://semver.org/)

## Contributing

This repository serves as a demonstration of Bit GitHub Actions integration. Feel free to explore the workflows and adapt them to your own projects.