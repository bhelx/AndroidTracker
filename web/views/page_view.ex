defmodule BhelxTrack.PageView do
  use BhelxTrack.Web, :view
  use Timex

  import Ecto.Query

  alias BhelxTrack.Repo
  alias BhelxTrack.Location

  def fetch_last_location do
    Location |> order_by(desc: :id) |> limit(1) |> Repo.one
  end

  def formatted_time(location) do
    Location.formatted_time location
  end

end
