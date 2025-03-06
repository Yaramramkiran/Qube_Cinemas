export function formatSize(bytes: number) {
    if (bytes === 0) return "0 MB";
    const mbSize = bytes / (1024 * 1024);
    return `${mbSize.toFixed(2)} MB`;
}
