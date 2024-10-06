#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR
cd ..

COUNT=$(bunx cloc app/ --quiet --csv | tail -n 1 | awk -F, '{print $NF}')
echo "$COUNT total lines"

if [ "$COUNT" -gt 5000 ]; then
  echo "Exceeded line limit!"
  exit 1
fi
