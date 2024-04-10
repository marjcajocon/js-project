# template for creating middleware in bottlepy
def cors_app(callback):
  def wrapper(*args, **kwargs):
    response.set_header("Access-Control-Allow-Origin", "*")
    response.set_header("Access-Control-Allow-Headers", "Auth, Origin, Accept, Content-Type")
    response.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
    
    return callback(*args, **kwargs)
  return wrapper


app = Bottle()
app.install(cors_app)
