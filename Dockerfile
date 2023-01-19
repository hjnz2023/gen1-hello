FROM gcr.io/distroless/nodejs18-debian11
EXPOSE 4000

COPY dist ./dist

CMD ["/dist/apps/hello/server/main.js"]
