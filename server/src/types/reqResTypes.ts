type ResSuccessProp<K, T extends string> = {
  success: true;
} & { [prop in T]: K };

export { ResSuccessProp };
