export const btcAddrWallet1 = {
  version: "0x01",
  hashbytes: "0x000102030405060708090a0b0c0d0e0f00010203",
};

export const btcAddrWallet2 = {
  version: "0x01",
  hashbytes: "0x00102030405060708090a0b0c0d0e0f000102030",
};

export const poxAddrPool1 = {
  version: "0x01",
  hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
};

export const poxAddrPool2 = {
  version: "0x01",
  hashbytes: "0x00b0b75f408a29c271d107e05d614d0ff439813d",
};

// as defined in fp-delegation.clar
export const poxAddrFP = {
  version: "0x00",
  hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce",
};

export const Errors = {
  NotFound: 404,
  NonPositiveAmount: 500,
  NoStackerInfo: 501,
  NoUserInfo: 502,
  StackingPermissionDenied: 609,
};

export const PoxErrors = {
  StackingAlreadyStacked: 3,
  StackingPermissionDenied: 9,
  StackingThresholdNotMet: 11,
  DelegationTooMuchLocked: 22,
  InvalidStartBurnHeight: 24,
  StackExtendNotLocked: 26,
};

export const FpErrors = {
  TooEarly: 500,
  StackingPermissionDenied: 709,
};
