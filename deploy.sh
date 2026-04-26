#!/usr/bin/env bash

set -euo pipefail

# Static deploy helper for SFTP-only Hestia accounts.
# It builds the site and uploads the contents of dist/ directly into public_html/.
REMOTE_USER="${REMOTE_USER:-icarus}"
REMOTE_HOST="${REMOTE_HOST:-172.238.55.127}"
REMOTE_PATH="${REMOTE_PATH:-/home/icarus/web/automata.engineer/public_html/}"
BUILD_DIR="${BUILD_DIR:-dist}"

if ! command -v sftp >/dev/null 2>&1; then
  echo "Error: sftp is not installed locally."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is not installed locally."
  exit 1
fi

echo "Building static site..."
npm run build

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Error: build output directory '$BUILD_DIR' was not created."
  exit 1
fi

batch_file="$(mktemp)"
trap 'rm -f "$batch_file"' EXIT

{
  echo "cd ${REMOTE_PATH}"

  find "$BUILD_DIR" -type d ! -path "$BUILD_DIR" | sort | while read -r dir; do
    rel_dir="${dir#${BUILD_DIR}/}"
    echo "mkdir ${rel_dir}"
  done

  find "$BUILD_DIR" -type f | sort | while read -r file; do
    rel_file="${file#${BUILD_DIR}/}"
    echo "put ${file} ${rel_file}"
  done

  echo "bye"
} > "$batch_file"

echo "Uploading contents of '$BUILD_DIR/' to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"
sftp -oBatchMode=no -b "$batch_file" "${REMOTE_USER}@${REMOTE_HOST}"

echo "Upload complete."
echo "Because this account is SFTP-only, make sure public_html/ was cleaned before running the script."
echo "Confirm in Hestia that index.html, assets/, and .htaccess are present in ${REMOTE_PATH}"
