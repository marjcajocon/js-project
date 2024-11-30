class Qr  {
  constructor() {
    

    this.supported = false;
    (async () => {
      this.supported = await this.init();
    })();
  }

  async init() {
    const promise = new Promise((resolve, reject) => {
      QRScanner.prepare((err, status) => {
        if (status.authorized) { 
          resolve(true);
        } else {
          resolve(false);
        }
      });  
    });

    return promise;
  }

  async Scan() {
    const body = document.body;
    body.style.backgroundColor = "rgba(0, 0, 0, 0)";
    QRScanner.show();
    const promise = new Promise((resolve, reject) => {
      QRScanner.scan((err, text) => {
        if(err){
          resolve(null);
        } else {
          resolve(text);
          QRScanner.hide();
        }

        body.style.backgroundColor = "white";
      });
    });

    return promise;
  }

  Destroy() {
    QRScanner.destroy();
  }
  
}

export default Qr;
