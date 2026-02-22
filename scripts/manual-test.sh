#!/bin/bash
curl -X POST http://localhost:8080/api/trading/start
curl http://localhost:8080/api/trading/status
curl http://localhost:8080/api/trading/history
