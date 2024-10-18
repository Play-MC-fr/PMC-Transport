import numpy as np
import tkinter as tk
from tkinter import messagebox
import customtkinter

axes_points = []
axes_stations = []

axes = {
    "Nord": [(-20, -7), (-20, -31), (-20, -73), (-20, -175), (-20, -271), (-20, -421), (-20, -571), (-20, -721)],
    "Sud": [(-20, 65), (-20, 89), (-20, 131), (-20, 233), (-20, 329), (-20, 479), (-20, 629), (-20, 779)],
    "Ouest": [(-55, 29), (-79, 29), (-121, 29), (-223, 29), (-319, 29), (-469, 29), (-619, 29), (-769, 29)],
    "Est": [(16, 29), (40, 29), (82, 29), (184, 29), (280, 29), (430, 29), (580, 29), (730, 29)],
    "Nord-Ouest": [(-55, -6), (-79, -30), (-121, -72), (-223, -174), (-319, -270), (-469, -420),  (-619, -570),  (-769, -720)],
    "Nord-Est": [(15, -6), (39, -30), (80, -72), (180, -174), (279, -270), (430, -421), (579, -570), (730, -720)],
    "Sud-Ouest": [(-55, 64), (-79, 88), (-121, -130), (-223, 232), (-319, -328), (-469, 478), (-619, 628), (-769, 779)],
    "Sud-Est": [(15, 64), (39, 88), (81, 130), (183, 232), (279, 328), (430, 479), (578, 628), (729, 778)],
}

axes_noms = {
    "Nord": "N",
    "Sud": "S",
    "Ouest": "O",
    "Est": "E",
    "Nord-Ouest": "NO",
    "Nord-Est": "NE",
    "Sud-Ouest": "SO",
    "Sud-Est": "SE"
}

for noms, points in axes.items():
    for i, point in enumerate(points, start=1):
        sortie = f"{axes_noms[noms]}{i}"
        axes_points.append((point[0], point[1], noms, i, sortie))

stations = {
    "Gare Spawn": (-221, 172),
    "RO/LQO - Dome": (-437, 270),
    "RO/LQO - Quartier Ouest": (-689, 252),
    "RO/LQO - Mairie  QO": (-739, 214),
    "RRSN - Chez Yomna": (0, 1019),
    "RRSN/2nd - Musé Sirlinium": (1582, 1550),
    "RRSN - Gare Sud 4": (0, 1937),
    "RRSN - Gare Airom": (0, 2873),
    "RRSN/L.Inqui - L'Inquisition": (-870, 3169),
    "RRSN - Chez ZuLynx": (0, 3151),
    "RRSN - Gare Sud 6": (0, 3824),
    "RRSN/L.Icaria - Icaria": (849, 4268),
    "RRSN/L.GK - Cité Maya NS6": (-159, 3844)
}


def distance(point1, point2):
    return np.sqrt((point2[0] - point1[0]) ** 2 + (point2[1] - point1[1]) ** 2)


def x_command(value):
    entry_x.delete(0, tk.END)
    entry_x.insert(0, str(round(value)))


def y_command(value):
    entry_y.delete(0, tk.END)
    entry_y.insert(0, str(round(value)))



def find_closest_point():
    try:
        x_a = float(entry_x.get())
        z_a = float(entry_y.get())
        a = ((x_a / 8), (z_a / 8))
        b = (x_a, z_a)

        closest_point = None
        min_distance = float('inf')

        for point in axes_points:
            dist = distance(a, point[:2])
            if dist < min_distance:
                min_distance = dist
                closest_point = point

        closest_station = None
        min_station_distance = float('inf')

        for station_name, station_coords in stations.items():
            dist_station = distance(b, station_coords)
            if dist_station < min_station_distance:
                min_station_distance = dist_station
                closest_station = (station_name, station_coords)

        closest_point_overworld = (closest_point[0] * 8, closest_point[1] * 8)
        min_distance_overworld = min_distance * 8
        min_station_distance_scaled = min_station_distance

        label_id.configure(text=f"{closest_point[2]} {closest_point[3]}", font=("Helvetica", 50, "bold"))
        label_coords.configure(text=closest_point_overworld, font=("Helvetica", 20, "bold"))
        label_distance.configure(text=round(min_distance_overworld), font=("Helvetica", 20, "bold"))
        label_station.configure(text=closest_station[0], font=("Helvetica", 50, "bold"))
        label_coords_station.configure(text=closest_station[1], font=("Helvetica", 20, "bold"))
        label_station_distance.configure(text=(round(min_station_distance_scaled)), font=("Helvetica", 20, "bold"))

    except ValueError:
        messagebox.showerror("Erreur", "Veuillez entrer des nombres valides.")


app = customtkinter.CTk()
app.title("Transport play-mc.fr")
app.geometry("730x380")
customtkinter.set_appearance_mode("Dark")


app.grid_columnconfigure(0, weight=1, minsize=140)
app.grid_columnconfigure(1, weight=4)
app.grid_rowconfigure(0, weight=1)


frame_gauche = customtkinter.CTkFrame(app)
frame_gauche.grid(row=0, column=0, sticky="nsew", padx=10, pady=10)

label_x = customtkinter.CTkLabel(frame_gauche, text="Coordonnée x:")
label_x.pack(pady=5)

slider_x = customtkinter.CTkSlider(frame_gauche, from_=-7000, to=7000, command=x_command)
slider_x.pack(pady=5)

entry_x = customtkinter.CTkEntry(frame_gauche)
entry_x.insert(0, str(0))
entry_x.pack(pady=5)

label_y = customtkinter.CTkLabel(frame_gauche, text="Coordonnée z:")
label_y.pack(pady=5)

slider_y = customtkinter.CTkSlider(frame_gauche, from_=-7000, to=7000, command=y_command)
slider_y.pack(pady=5)

entry_y = customtkinter.CTkEntry(frame_gauche)
entry_y.insert(0, str(0))
entry_y.pack(pady=5)

button_find = customtkinter.CTkButton(frame_gauche, text="Y aller", command=find_closest_point)
button_find.pack(pady=10)




frame_droite = customtkinter.CTkFrame(app)
frame_droite.grid(row=0, column=1, sticky="nsew", padx=10, pady=10)

tabview = customtkinter.CTkTabview(master=frame_droite)
tabview.pack(padx=20, pady=20, expand=True, fill="both")

autoroute = tabview.add("Autoroute")
minimetro = tabview.add("Minimetro")
tabview.set("Autoroute")

label_id = customtkinter.CTkLabel(autoroute, text="Sortie d'autoroute Nether", font=("Sergoe UI", 10, "italic"))
label_id.pack()

label_coords = customtkinter.CTkLabel(autoroute, text="Coordonnées", font=("Sergoe UI", 10, "italic"))
label_coords.pack()

label_distance = customtkinter.CTkLabel(autoroute, text="Distance", font=("Sergoe UI", 10, "italic"))
label_distance.pack()

label_station = customtkinter.CTkLabel(minimetro, text="Station la plus proche", font=("Sergoe UI", 10, "italic"))
label_station.pack()

label_coords_station = customtkinter.CTkLabel(minimetro, text="Coordonnées", font=("Sergoe UI", 10, "italic"))
label_coords_station.pack()

label_station_distance = customtkinter.CTkLabel(minimetro, text="Distance station", font=("Sergoe UI", 10, "italic"))
label_station_distance.pack()

app.mainloop()
