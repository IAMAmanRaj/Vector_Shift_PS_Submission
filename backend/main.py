import os # Import the os module to access environment variables
from fastapi import FastAPI, Form
from typing import List, Dict, Any
import json

# Add necessary imports for CORS (Cross-Origin Resource Sharing)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- START OF NECESSARY CHANGE ---

# 1. Define the default origins (for local development)
default_origins = [
    "https://reactflow-pipeline-editor.vercel.app/",
    "http://localhost:3000",  # Default React development port
    "http://127.0.0.1:3000",
]

# 2. Read the allowed origin from the environment variable (e.g., in Vercel)
# The variable is named 'FRONTEND_ORIGIN'
frontend_origin_env = os.getenv("FRONTEND_ORIGIN")

# 3. Construct the final list of allowed origins
if frontend_origin_env:
    # If the environment variable is set, add it to the list of allowed origins.
    # This covers cases where 'FRONTEND_ORIGIN' is the deployed Vercel URL.
    origins = default_origins + [frontend_origin_env]
else:
    # If the environment variable is not set (e.g., during local testing), 
    # use only the default origins.
    origins = default_origins

print(f"Configured CORS Origins: {origins}") # Helpful for debugging

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- END OF NECESSARY CHANGE ---

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

# Function to perform Depth First Search (DFS) for cycle detection
def is_cyclic_util(node_id: str, graph: Dict[str, List[str]], visited: Dict[str, bool], recursion_stack: Dict[str, bool]) -> bool:
    """Utility function for DFS to detect cycles."""
    visited[node_id] = True
    recursion_stack[node_id] = True

    if node_id in graph:
        for neighbor_id in graph[node_id]:
            if not visited.get(neighbor_id, False):
                if is_cyclic_util(neighbor_id, graph, visited, recursion_stack):
                    return True
            elif recursion_stack.get(neighbor_id, False):
                return True # Cycle detected

    recursion_stack[node_id] = False
    return False

def check_for_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """Checks if the nodes and edges form a Directed Acyclic Graph (DAG)."""
    
    # 1. Build the Adjacency List (Graph)
    graph = {}
    node_ids = {node['id'] for node in nodes}

    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')

        # Only consider edges between actual nodes (React Flow handles can be tricky)
        if source in node_ids and target in node_ids:
            if source not in graph:
                graph[source] = []
            graph[source].append(target)
    
    # 2. Check for Cycles using DFS
    visited = {node_id: False for node_id in node_ids}
    recursion_stack = {node_id: False for node_id in node_ids}
    
    # 

    # Iterate over all nodes in case the graph is disconnected
    for node_id in node_ids:
        if not visited[node_id]:
            if is_cyclic_util(node_id, graph, visited, recursion_stack):
                return False # Cycle found, it is NOT a DAG

    return True # No cycles found, it is a DAG


# Change to POST since we are submitting data, and use Form to parse the JSON string
@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    """Parses the pipeline data, calculates counts, and checks for DAG."""
    try:
        pipeline_data = json.loads(pipeline)
    except json.JSONDecodeError:
        # FastAPI's HTTPException is preferred for proper HTTP error responses, 
        # but sticking to the original return format for minimal changes.
        return {'error': 'Invalid JSON format for pipeline data'}, 400

    nodes = pipeline_data.get('nodes', [])
    raw_edges = pipeline_data.get('edges', [])
    
    node_ids = {node['id'] for node in nodes}

    # CRITICAL FIX: Filter raw edges to create a set of valid edges for calculation
    valid_edges = [
        edge for edge in raw_edges 
        if edge.get('source') in node_ids and edge.get('target') in node_ids
    ]

    num_nodes = len(nodes)
    num_edges = len(valid_edges) # Use the count of VALID edges
    
    # Check for DAG
    is_dag = check_for_dag(nodes, valid_edges)

    # The response format requested by the prompt
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }