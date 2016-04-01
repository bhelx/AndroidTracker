defmodule BhelxTrack.PageController do
  use BhelxTrack.Web, :controller

  require Logger

  alias BhelxTrack.Endpoint
  alias BhelxTrack.Location

  def index(conn, _params) do
    render conn, "index.html"
  end

  def update(conn, params) do
    changeset = Location.changeset(%Location{}, params)

    case Repo.insert(changeset) do
      {:ok, location} ->
        payload = %{
          created: location.inserted_at,
          lat: location.lat,
          lon: location.lon
        }

        Endpoint.broadcast("locations:lobby", "new_location", payload)

        text conn, "OK"
      {:error, changeset} ->
        Logger.debug "failed to save changset"
        text conn, "FAILED"
    end
  end
end
