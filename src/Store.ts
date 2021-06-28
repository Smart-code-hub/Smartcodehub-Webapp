class Store {
  //1;State
  //2: Get The state
  //3: listen To State
  //4: update To State
  private State: any;
  private listnerFunctions: Function[] = [];
  GetState = () => {
    return this.State;
  };
  Subscribe = (fun: Function) => {
    this.listnerFunctions.push(fun);
    return () => {
      this.listnerFunctions = this.listnerFunctions.filter(a => a !== fun);
    };
  };
}
