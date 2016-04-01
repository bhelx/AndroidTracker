defmodule BhelxTrack.PageView do
  use BhelxTrack.Web, :view
  import Ecto.Query

  alias BhelxTrack.Repo
  alias BhelxTrack.Location

  def location do
    Location |> order_by(desc: :id) |> limit(1) |> Repo.all |> List.first
  end

end
