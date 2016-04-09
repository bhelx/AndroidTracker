defmodule BhelxTrack.Location do
  use BhelxTrack.Web, :model
  use Timex.Ecto.Timestamps
  use Timex

  schema "locations" do
    field :lat, :float
    field :lon, :float

    timestamps
  end

  @required_fields ~w(lat lon)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def formatted_time(location) do
    {:ok, t} = location.inserted_at
      |> Timex.datetime
      |> Timezone.convert("America/Chicago")
      |> Timex.format("%FT%T%:z", :strftime)

    t
  end
end
