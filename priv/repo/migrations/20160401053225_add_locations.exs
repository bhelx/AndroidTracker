defmodule BhelxTrack.Repo.Migrations.AddLocations do
  use Ecto.Migration

  def change do
    create table(:locations) do
      add :lat, :float
      add :lon, :float

      timestamps
    end
  end
end
