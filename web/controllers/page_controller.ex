defmodule BhelxTrack.PageController do
  use BhelxTrack.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def update(conn, params) do
    BhelxTrack.Endpoint.broadcast("locations:lobby", "new_location", params)
    text conn, "OK"
  end
end
