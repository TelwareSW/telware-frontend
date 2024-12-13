#!/bin/bash

SESSION_NAME="telware-frontend"

tmux has-session -t $SESSION_NAME 2>/dev/null

if [ $? != 0 ]; then

  # Window 1: Open nvim
  tmux new-session -d -s $SESSION_NAME -n vim
  tmux send-keys -t $SESSION_NAME 'v' C-m

  # Window 2: Docker Compose
  tmux new-window -t $SESSION_NAME -n docker
  tmux send-keys -t $SESSION_NAME:2 'docker-compose up' C-m

  # Window 3: Attach to the container
  tmux new-window -t $SESSION_NAME -n container
  tmux send-keys -t $SESSION_NAME:3 'docker exec -it telware-frontend-frontend-1 /bin/sh' C-m
fi

# Attach to the session
tmux attach-session -t $SESSION_NAME
