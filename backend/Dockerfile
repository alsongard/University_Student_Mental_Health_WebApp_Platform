FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
ENV CI=true
COPY . /app
WORKDIR /app

RUN node --version
RUN pnpm --version
RUN pnpm i -g nodemon
COPY package.json pnpm-lock.yaml ./

# FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install  --frozen-lockfile


# For development, we'll mount source code at runtime, so no COPY here
# adjust to your app's port
EXPOSE 5000   
CMD ["pnpm", "dev"]
