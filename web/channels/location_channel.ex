defmodule BhelxTrack.LocationChannel do
  use Phoenix.Channel

  def join("locations:lobby", _message, socket) do
    {:ok, socket}
  end

  def handle_out("new_location", payload, socket) do
    push socket, "new_location", payload
    {:noreply, socket}
  end
end

