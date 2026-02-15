from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.config import settings

# Initialize FastAPI application
app = FastAPI(
    title="Fraud Detection API",
    description="Real-time transaction fraud detection system for VexStorm'26 Capital-Core track",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for cross-origin requests
# Allows frontend (localhost:3000 or Vercel) to call backend API
origins = settings.cors_origins.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router, prefix="/api", tags=["fraud-detection"])


@app.get("/", tags=["health"])
async def root():
    """Root endpoint - API health check"""
    return {
        "message": "Fraud Detection API is running",
        "status": "healthy",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health", tags=["health"])
async def health_check():
    """Health check endpoint for monitoring and deployment verification"""
    return {
        "status": "healthy",
        "environment": settings.environment
    }
