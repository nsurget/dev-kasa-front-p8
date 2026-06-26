import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Carousel from "../Carousel";

const mockPictures = [
  "https://example.com/pic1.jpg",
  "https://example.com/pic2.jpg",
  "https://example.com/pic3.jpg",
  "https://example.com/pic4.jpg",
  "https://example.com/pic5.jpg",
  "https://example.com/pic6.jpg",
];

describe("Carousel Component (Collage with Paginated Thumbnails)", () => {
  it("renders the main visual and first page of thumbnails by default", () => {
    render(<Carousel pictures={mockPictures} title="Appartement cosy" />);

    // Main image should be rendered
    const mainImg = screen.getByAltText("Appartement cosy - Photo principale");
    expect(mainImg).toBeInTheDocument();
    expect(mainImg).toHaveAttribute("src", "https://example.com/pic1.jpg");

    // Thumbnails for page 1 should be visible (indices 1 to 4)
    // The component displays pictures[0] to pictures[3] on page 1
    const thumb1 = screen.getByRole("button", { name: "Photo miniature 1" });
    const thumb2 = screen.getByRole("button", { name: "Photo miniature 2" });
    const thumb3 = screen.getByRole("button", { name: "Photo miniature 3" });
    const thumb4 = screen.getByRole("button", { name: "Photo miniature 4" });

    expect(thumb1).toBeInTheDocument();
    expect(thumb2).toBeInTheDocument();
    expect(thumb3).toBeInTheDocument();
    expect(thumb4).toBeInTheDocument();

    // The active thumbnail should have class aria-current="true"
    expect(thumb1).toHaveAttribute("aria-current", "true");
    expect(thumb2).toHaveAttribute("aria-current", "false");
  });

  it("changes the active main image when clicking on a thumbnail", () => {
    render(<Carousel pictures={mockPictures} title="Appartement cosy" />);

    const thumb2 = screen.getByRole("button", { name: "Photo miniature 2" });
    fireEvent.click(thumb2);

    // Active image should change
    const mainImg = screen.getByAltText("Appartement cosy - Photo principale");
    expect(mainImg).toHaveAttribute("src", "https://example.com/pic2.jpg");

    expect(thumb2).toHaveAttribute("aria-current", "true");
  });

  it("paginates thumbnails correctly when next/prev page buttons are clicked", () => {
    render(<Carousel pictures={mockPictures} title="Appartement cosy" />);

    // Check pagination indicator is visible
    expect(screen.getByText("1 / 2")).toBeInTheDocument();

    // Click next page of thumbnails
    const nextBtn = screen.getByLabelText("Page de miniatures suivante");
    fireEvent.click(nextBtn);

    expect(screen.getByText("2 / 2")).toBeInTheDocument();

    // Thumbnails for page 2 should now be visible (indices 5 and 6)
    const thumb5 = screen.getByRole("button", { name: "Photo miniature 5" });
    const thumb6 = screen.getByRole("button", { name: "Photo miniature 6" });

    expect(thumb5).toBeInTheDocument();
    expect(thumb6).toBeInTheDocument();

    // Click previous page of thumbnails
    const prevBtn = screen.getByLabelText("Page de miniatures précédente");
    fireEvent.click(prevBtn);

    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  it("opens the fullscreen lightbox modal when clicking the main visual", () => {
    render(<Carousel pictures={mockPictures} title="Appartement cosy" />);

    // Click main image
    const mainImg = screen.getByAltText("Appartement cosy - Photo principale");
    fireEvent.click(mainImg.closest("div")!);

    // Lightbox should be visible
    const lightbox = screen.getByRole("dialog", { name: "Galerie photo plein écran" });
    expect(lightbox).toBeInTheDocument();

    // Counter inside lightbox should be visible (along with main counter)
    expect(screen.getAllByText("1 / 6")).toHaveLength(2);

    // Close button should close lightbox
    const closeBtn = screen.getByLabelText("Fermer la galerie plein écran");
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports keyboard arrow navigation", () => {
    render(<Carousel pictures={mockPictures} title="Appartement cosy" />);

    const container = screen.getByRole("region", { name: /Photos de/ });
    container.focus();

    // Navigate with ArrowRight
    fireEvent.keyDown(container, { key: "ArrowRight" });
    const mainImg = screen.getByAltText("Appartement cosy - Photo principale");
    expect(mainImg).toHaveAttribute("src", "https://example.com/pic2.jpg");

    // Navigate with ArrowLeft
    fireEvent.keyDown(container, { key: "ArrowLeft" });
    expect(mainImg).toHaveAttribute("src", "https://example.com/pic1.jpg");
  });

  it("hides thumbnails and controls when there is only one image", () => {
    render(<Carousel pictures={["https://example.com/pic1.jpg"]} title="Appartement cosy" />);

    // Counter and arrow controls should not be rendered
    expect(screen.queryByText(/1 \//)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Photo miniature/ })).not.toBeInTheDocument();
  });
});
