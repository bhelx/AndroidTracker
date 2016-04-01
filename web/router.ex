defmodule BhelxTrack.Router do
  use BhelxTrack.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", BhelxTrack do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/update", PageController, :update
  end

  # Other scopes may use custom stacks.
  # scope "/api", BhelxTrack do
  #   pipe_through :api
  # end
end
