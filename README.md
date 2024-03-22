# Reproduction

npm install
npm run dev

1. Attach Node debugger and take a snapshot of the heap
2. Put some load onto the server, e.g. by running `hey -n 2000 http://localhost:3000/test`
3. Take another snapshot of the heap

You should see that the heap size has increased significantly.
