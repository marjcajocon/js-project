import { button, div, p } from "../plugin/core.js";
import { Button, Label, ModalV2, Panel } from "../plugin/mcontrol.js";


class Dialog extends div {
  constructor() {
    super();
    this.class("core-dialog");

    
    this.square = new div().class(["core-dialog-sq", "c-fade"]);

    this.resolve = null;
    this.reject = null;

    super.add([
      this.square
    ]);
  }

  async show() {
    this.body.appendChild(this.control);

    const promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    return promise;
  }

  add(widget) {
    this.square.add(widget);
  } 
  
  hide(resolve = null) {
    this.control.remove();
    setTimeout(() => {
      this.resolve(resolve);
    }, 100);
  }


}

class DialogConfirm2 extends Dialog {
  constructor(label = "Confirm", ok_msg = "Yes", cancel_msg = "No") {
    super();

    const content = new div().style({
      width: "100%",
      height: "100%",
      borderRadius: "5px"
    });


    const header = new div().style({
      width: "100%",
      backgroundColor: "rgb(255, 212, 0)",
      textAlign: "center",
      letterSpacing: "5px",
      fontWeight: "bold",
      padding: "5px",
      borderRadius: "5px 5px 0 0"
    })
    .html("CONFIRM");
    
    const body = new div().style({
      width: "100%",
      minHeight: "30px",
      verticalAlign: "bottom",
      padding: "20px 20px 0 20px",
      letterSpacing: "3px"
    }).add(new p().text(label));

    const yes = new button().html(ok_msg).class(["c-btn1"]).style({
      color: "#3adb3a",
      fontWeight: "bold",
      letterSpacing: "3px"
    });

    const no = new button().html(cancel_msg).class(["c-btn1"]).style({
      marginLeft: "2px",
      color: "#ff4646",
      fontWeight: "bold",
      letterSpacing: "3px"
    });

    const foot = new p().add([
      yes, no
    ]).style({
      padding: "20px"
    });

    yes.action("click", () => {
      this.hide(true);
    });

    no.action("click", () => {
      this.hide(false);
    });

    content.add([
      header,
      body,
      foot
    ]);

    this.add(content);

  } 
}


class DialogAlert2 extends Dialog {
  constructor(label = "", ok_msg = "OK", cancel_msg = "CLOSE") {
    super();

    const content = new div().style({
      width: "100%",
      height: "100%",
      borderRadius: "5px"
    });


    const header = new div().style({
      width: "100%",
      backgroundColor: "rgb(243, 243, 243)",
      textAlign: "center",
      letterSpacing: "5px",
      fontWeight: "bold",
      padding: "5px",
      borderRadius: "5px 5px 0 0"
    })
    .html("ALERT");
    
    const body = new div().style({
      width: "100%",
      minHeight: "30px",
      verticalAlign: "bottom",
      padding: "20px 20px 0 20px",
      letterSpacing: "3px"
    }).add(new p().text(label));

    const yes = new button().html(ok_msg).class(["c-btn1"]).style({
      color: "#3adb3a",
      fontWeight: "bold",
      letterSpacing: "3px"
    });

    // const no = new button().html(cancel_msg).class(["c-btn1"]).style({
    //   marginLeft: "2px",
    //   color: "#ff4646",
    //   fontWeight: "bold",
    //   letterSpacing: "3px"
    // });

    const foot = new p().add([
      yes
    ]).style({
      padding: "20px"
    });

    yes.action("click", () => {
      this.hide(true);
    });

    // no.action("click", () => {
    //   this.hide(false);
    // });

    content.add([
      header,
      body,
      foot
    ]);

    this.add(content);

  } 
}

class DialogConfirm extends ModalV2 {

  constructor(title) {
    super("Confirm", "question");
    


    const label = new Label(title).setStyle({
      marginTop: "50px",
      marginLeft: "2px"
    });

    const yes = new Button("Ok", "success", "check");

    const no = new Button("Cancel", "danger", "close").setStyle({
      marginLeft: "5px"
    });

    yes.addEventListener("click", async () => {
      this.hide(true);
    });

    no.addEventListener("click", async () => {
      this.hide(false);
    });


    this.add(new Panel().add(label)).add(new Panel().add(yes).add(no).setStyle({
      marginTop: "20px"
    }));

  }



}


class DialogAlert extends ModalV2 {
  constructor(title) {

    super("Alert", "exclamation");
    
    this.resolve = true;

    const label = new Label(title).setStyle({
      marginTop: "50px",
      marginLeft: "2px"
    });

    const yes = new Button("Ok", "success", "check");


    yes.addEventListener("click", async () => {
      this.hide(true);
    });

    

    this.add(new Panel().add(label)).add(new Panel().add(yes).setStyle({
      marginTop: "20px"
    }));

  }
  
}




const Alert = async (title) => {

  const dialog = new DialogAlert2(title);
  return await dialog.show();
};


const Confirm = async (title) => {

  const dialog = new DialogConfirm2(title);

  return await dialog.show();
};


export { Alert, Confirm };
