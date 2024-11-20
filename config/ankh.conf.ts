interface IAnkhConf {
  auth: IAnkhConfAuth
}
interface IAnkhConfAuth {
  mode: EAnkhConfAuthMode
}

enum EAnkhConfAuthMode {
  InApp = "IN_APP",
  Entire = "ENTIRE",
}

const conf: IAnkhConf = {
  auth: {
    mode: EAnkhConfAuthMode.InApp,
  },
}

export { conf }
export { EAnkhConfAuthMode }
