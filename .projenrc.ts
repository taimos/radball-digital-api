import { TaimosTypescriptLibrary } from '@taimos/projen';
import { javascript, YamlFile } from 'projen';
import { GithubCredentials } from 'projen/lib/github';
import { GitHubAssignApprover } from 'projen-pipelines/lib/assign-approver';

const project = new TaimosTypescriptLibrary({
  name: '@taimos/radball-digital-api',
  description: 'Radball Digital API',
  keywords: ['radball', 'digital', 'api'],
  repository: 'https://github.com/taimos/radball-digital-api.git',
  defaultReleaseBranch: 'main',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  licensed: false,
  projenCredentials: GithubCredentials.fromApp(),
  depsUpgradeOptions: {
    workflowOptions: {
      projenCredentials: GithubCredentials.fromApp(),
      schedule: javascript.UpgradeDependenciesSchedule.WEEKLY,
      assignees: ['hoegertn', 'hoegerma'],
    },
  },
  githubOptions: {
    mergeQueue: true,
    mergeQueueOptions: {
      autoQueue: true,
    },
  },
  buildWorkflowOptions: {
    workflowTriggers: {
      pullRequest: {},
      workflowDispatch: {},
      mergeGroup: {},
    },
  },
  tsconfig: {
    compilerOptions: {
      skipLibCheck: true,
      paths: {
        '@generated/*': ['./src/generated/*'],
        '@util/*': ['./src/util/*'],
      },
    },
  },
  jestOptions: {
    jestConfig: {
      moduleNameMapper: {
        '^@generated/(.*)$': '<rootDir>/src/generated/$1',
        '^@util/(.*)$': '<rootDir>/src/util/$1',
      },
      // setupFiles: ['<rootDir>/test/setup.ts'],
    },
  },
  devDeps: [
    '@taimos/projen',
    'projen-pipelines',
    '@graphql-codegen/cli',
    '@graphql-codegen/typescript',
  ],
  deps: [
    'date-fns',
    'openapi-typescript',
    'uuid',
    'graphql',
  ],
});

const codegenConfigFileName = 'graphql-codegen.yml';
const generateGraphqlTask = project.addTask('generate:api:graphql', {
  exec: `graphql-codegen -c ${codegenConfigFileName}`,
  description: 'Generate Types from the GraphQL specification',
});
project.preCompileTask.prependSpawn(generateGraphqlTask);

new YamlFile(project, codegenConfigFileName, {
  obj: {
    schema: [
      'aws.graphql',
      'schema.graphql',
    ],
    config: {
      scalars: {
        AWSDate: 'string',
        AWSURL: 'string',
        AWSEmail: 'string',
        AWSTime: 'string',
        AWSDateTime: 'string',
        AWSTimestamp: 'string',
        AWSPhone: 'string',
        AWSIPAddress: 'string',
        AWSJSON: 'string',
      },
      maybeValue: 'T | undefined',
    },
    generates: {
      ['./src/generated/graphql.model.generated.ts']: {
        plugins: ['typescript'],
      },
    },
  },
});

const generateRestTask = project.addTask('generate:api:rest', {
  exec: 'openapi-typescript rest.yaml --output src/generated/rest.model.generated.ts',
  description: 'Generate Types from the OpenAPI specification',
});
project.preCompileTask.prependSpawn(generateRestTask);

new GitHubAssignApprover(project, {
  approverMapping: [{
    author: 'hoegertn',
    approvers: ['hoegerma'],
  }, {
    author: 'hoegerma',
    approvers: ['hoegertn'],
  }],
  defaultApprovers: ['hoegertn', 'hoegerma'],
});


project.synth();