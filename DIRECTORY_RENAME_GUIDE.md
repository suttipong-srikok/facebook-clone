# Complete Rebranding: Remove "social-media-clone" Directory Name

## Current Issue
The project directory might still have old naming, which could cause Docker to create container names with old references.
- `social-network_social-network`
- `social-network_social-network-db`
- `social-network_social-network-backend`

## Solutions

### Option 1: Rename Project Directory (Recommended)

**Steps:**
1. **Stop all containers first:**
   ```bash
   docker-compose down
   ```

2. **Rename the project directory:**
   ```bash
   # From parent directory
   cd d:\Dev
   mv old-social-media-clone social-network
   ```

3. **Update your working directory:**
   ```bash
   cd d:\Dev\social-network
   ```

4. **Restart containers:**
   ```bash
   docker-compose up --build
   ```

**Result:** Container names will become:
- `social-network_social-network`
- `social-network_social-network-db` 
- `social-network_social-network-backend`

### Option 2: Use Docker Compose Project Name Override

Add this to your `docker-compose.yml` and `docker-compose.prod.yml`:

```yaml
version: '3.8'

# Add this line at the top level
name: social-network

services:
  # ...existing services
```

**Result:** Container names will become:
- `social-network-social-network`
- `social-network-social-network-db`
- `social-network-social-network-backend`

### Option 3: Use Environment Variable

Set the project name when running Docker Compose:

```bash
# Development
COMPOSE_PROJECT_NAME=social-network docker-compose up

# Production  
COMPOSE_PROJECT_NAME=social-network docker-compose -f docker-compose.prod.yml up
```

### Option 4: Simplify Service Names

If you rename the directory AND simplify service names in docker-compose files:

```yaml
services:
  app:           # instead of social-network
  backend:       # instead of backend-prod
  database:      # instead of postgres-prod
```

**Result:** Clean container names like:
- `social-network_app`
- `social-network_backend`
- `social-network_database`

## Recommendation

I recommend **Option 1** (rename directory) + **Option 4** (simplify service names) for the cleanest solution:

1. Rename any old directory names → `social-network`
2. Update service names to be simpler
3. Remove all traces of old branding from the entire project

Would you like me to implement any of these solutions?
